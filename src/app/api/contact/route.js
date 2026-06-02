import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();

    const {
      parentName,
      phone,
      studentGrade,
      subject,
      area,
      currentLevel,
      goal,
      preferredTime,
      message,
    } = data;

    if (!parentName || !phone || !studentGrade || !subject) {
      return Response.json(
        { message: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    if (
      !process.env.GMAIL_USER ||
      !process.env.GMAIL_APP_PASSWORD ||
      !process.env.CONTACT_TO_EMAIL
    ) {
      console.error("환경변수 누락:", {
        GMAIL_USER: Boolean(process.env.GMAIL_USER),
        GMAIL_APP_PASSWORD: Boolean(process.env.GMAIL_APP_PASSWORD),
        CONTACT_TO_EMAIL: Boolean(process.env.CONTACT_TO_EMAIL),
      });

      return Response.json(
        { message: "메일 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"과외친구 상담폼" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: process.env.GMAIL_USER,
      subject: `[과외친구] 새로운 상담 요청 - ${studentGrade} ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7;">
          <h2>과외친구 상담 요청</h2>
          <p><strong>학부모 성함:</strong> ${parentName}</p>
          <p><strong>연락처:</strong> ${phone}</p>
          <p><strong>학생 학년:</strong> ${studentGrade}</p>
          <p><strong>희망 과목:</strong> ${subject}</p>
          <p><strong>지역 / 온라인 가능 여부:</strong> ${area || "-"}</p>
          <p><strong>현재 성적 또는 수준:</strong> ${currentLevel || "-"}</p>
          <p><strong>목표:</strong> ${goal || "-"}</p>
          <p><strong>희망 요일 / 시간:</strong> ${preferredTime || "-"}</p>
          <p><strong>추가 내용:</strong></p>
          <p>${message || "-"}</p>
        </div>
      `,
    });

    return Response.json({ message: "상담 요청이 전송되었습니다." });
  } catch (error) {
    console.error("메일 전송 오류:", error);

    return Response.json(
      { message: "상담 요청 전송 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}