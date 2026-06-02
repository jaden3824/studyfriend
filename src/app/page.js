"use client";

import { useState } from "react";

const subjects = [
  "초등 수학",
  "초등 영어",
  "중등 수학",
  "중등 영어",
  "고등 수학",
  "고등 영어",
  "국어",
  "과학",
  "내신 대비",
  "모의고사 대비",
];

const steps = [
  {
    number: "01",
    title: "상담 신청",
    desc: "학생 학년, 과목, 현재 성적, 목표, 희망 요일, 수업 방식 등을 간단히 확인합니다.",
  },
  {
    number: "02",
    title: "학생 상황 분석",
    desc: "기초 보완, 내신 관리, 선행 학습, 모의고사 대비 등 학생에게 필요한 수업 방향을 정리합니다.",
  },
  {
    number: "03",
    title: "선생님 매칭",
    desc: "조건에 맞는 선생님을 확인한 뒤 학교, 전공, 가능 과목, 과외 경력, 수업 방식이 포함된 프로필을 전달합니다.",
  },
  {
    number: "04",
    title: "시범수업 후 정식 수업 결정",
    desc: "1회 무료 시범수업 후 학생과 학부모님의 만족도를 확인하고, 정식 수업 진행 여부를 결정합니다.",
  },
];

const prices = [
  {
    grade: "초등학생",
    monthly: "월 24만원",
    desc: "기초 학습, 공부 습관 형성, 학교 진도 보완, 중등 선행 준비",
  },
  {
    grade: "중학생",
    monthly: "월 36만원",
    desc: "기초 개념, 내신 대비, 공부 습관 형성, 고등 선행 준비",
  },
  {
    grade: "고등학생",
    monthly: "월 40만원",
    desc: "내신 관리, 모의고사 대비, 약점 단원 보완, 수능 기초·심화 대비",
  },
];

const reviews = [
  {
    title: "김○○ 학생 · 초6 수학",
    result: "단원평가 68점 → 88점",
    text: "계산 실수와 문장제 풀이에서 자주 막히던 학생에게, 문제를 읽고 식을 세우는 연습을 반복했습니다. 이후 단원평가에서 풀이 과정이 안정되고 실수가 줄어들었습니다.",
  },
  {
    title: "이○○ 학생 · 중2 수학",
    result: "중간고사 62점 → 기말고사 84점",
    text: "개념은 알고 있었지만 시험에서 응용문제를 자주 틀리던 학생에게, 학교 시험지 분석과 오답 유형 정리를 중심으로 수업 방향을 잡았습니다.",
  },
  {
    title: "박○○ 학생 · 고1 영어",
    result: "모의고사 5등급 → 3등급",
    text: "단어 암기는 되어 있었지만 독해 속도가 느린 학생에게, 지문 구조 파악과 유형별 풀이 순서를 반복 훈련했습니다. 시간 안에 푸는 문제 수가 늘어나며 등급이 개선되었습니다.",
  },
];

const faqs = [
  {
    q: "상담은 무료인가요?",
    a: "네. 학생 상황 확인과 선생님 추천 상담은 무료로 진행됩니다.",
  },
  {
    q: "과외비는 정해져 있나요?",
    a: "홈페이지의 과외비는 학년별 권장 금액입니다. 과목, 지역, 수업 방식, 선생님 경력에 따라 달라질 수 있습니다.",
  },
  {
    q: "선생님은 어떻게 확인하나요?",
    a: "학교, 전공, 가능 과목, 과외 경력, 수업 가능 조건 등을 확인한 뒤 프로필 형태로 안내합니다.",
  },
  {
    q: "초등학생도 과외가 가능한가요?",
    a: "네. 초등학생부터 고등학생까지 상담 가능하며, 학생 수준과 목표에 맞춰 선생님을 추천합니다.",
  },
  {
    q: "방문 과외와 화상과외 모두 가능한가요?",
    a: "네. 지역과 선생님 조건에 따라 방문 과외와 화상과외 모두 상담 가능합니다.",
  },
];

function KakaoIcon() {
  return (
    <img
      src="/kakao-logo.png"
      alt="카카오톡"
      className="h-6 w-6 shrink-0 rounded-md object-cover"
    />
  );
}

export default function Home() {
  const [form, setForm] = useState({
    parentName: "",
    phone: "",
    studentGrade: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName: form.parentName,
          phone: form.phone,
          studentGrade: form.studentGrade,
          subject: form.subject,
          area: "",
          currentLevel: "",
          goal: "",
          preferredTime: "",
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error("상담 신청 전송 실패");
      }

      setStatus("success");
      setForm({
        parentName: "",
        phone: "",
        studentGrade: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#" className="flex items-center">
            <img
              src="/gwaoechingu-logo.png"
              alt="과외친구 로고"
              className="h-12 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-8 text-base font-black text-slate-700 md:flex">
            <a href="#process" className="transition hover:text-[#315CD1]">
              이용절차
            </a>
            <a href="#teachers" className="transition hover:text-[#315CD1]">
              선생님 검증
            </a>
            <a href="#price" className="transition hover:text-[#315CD1]">
              과외비
            </a>
            <a href="#review" className="transition hover:text-[#315CD1]">
              후기
            </a>
            <a href="#faq" className="transition hover:text-[#315CD1]">
              F&Q
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-full bg-[#315CD1] px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-[#284FBA]"
          >
            무료 상담
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-white">
        <div className="absolute left-1/2 top-0 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#EAF1FF] blur-3xl" />
        <div className="absolute right-0 top-32 hidden h-72 w-72 rounded-full bg-[#F3F7FF] blur-2xl md:block" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap gap-2">
              <div className="inline-flex w-fit items-center rounded-full border border-[#CAD9FF] bg-[#EEF4FF] px-4 py-2 text-sm font-black text-[#284FBA]">
                초등부터 고등까지
              </div>
              <div className="inline-flex w-fit items-center rounded-full border border-[#CAD9FF] bg-white px-4 py-2 text-sm font-black text-[#315CD1]">
                1:1 맞춤 과외 매칭
              </div>
              <div className="inline-flex w-fit items-center rounded-full border border-[#CAD9FF] bg-white px-4 py-2 text-sm font-black text-[#315CD1]">
                선생님 프로필 확인
              </div>
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
              우리 아이에게 맞는
              <br />
              과외 선생님,
              <br />
              <span className="text-[#315CD1]">과외친구</span>가 찾아드립니다.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              초등학생부터 고등학생까지, 학생의 현재 수준과 학습 성향을 상담한
              뒤 수업 목표에 맞는 1:1 과외 선생님을 추천합니다.
            </p>

            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#DCE7FF] bg-[#F2F6FF] p-4">
                <p className="text-2xl font-black text-[#315CD1]">상담</p>
                <p className="mt-1 text-sm font-bold text-slate-600">
                  학생 상황 확인
                </p>
              </div>
              <div className="rounded-2xl border border-[#DCE7FF] bg-[#F2F6FF] p-4">
                <p className="text-2xl font-black text-[#315CD1]">분석</p>
                <p className="mt-1 text-sm font-bold text-slate-600">
                  학습 방향 정리
                </p>
              </div>
              <div className="rounded-2xl border border-[#DCE7FF] bg-[#F2F6FF] p-4">
                <p className="text-2xl font-black text-[#315CD1]">매칭</p>
                <p className="mt-1 text-sm font-bold text-slate-600">
                  선생님 추천
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="rounded-2xl bg-[#315CD1] px-7 py-4 text-center text-base font-black text-white shadow-lg shadow-[#D1DDFF] transition hover:bg-[#284FBA]"
              >
                무료 상담 신청하기
              </a>
              <a
                href="http://pf.kakao.com/_fxcPGX/chat"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#CAD9FF] bg-white px-7 py-4 text-center text-base font-black text-[#284FBA] transition hover:border-[#AFC4FF] hover:bg-[#F2F6FF]"
              >
                <KakaoIcon />
                카카오톡 상담하기
              </a>
            </div>

            <p className="mt-4 text-sm font-bold text-[#284FBA]">
              학생의 학년, 과목, 성향, 목표에 맞춰 선생님을 추천해드립니다.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <p className="text-sm font-black text-[#AFC4FF]">
                과외친구 맞춤 매칭
              </p>
              <h2 className="mt-3 text-2xl font-black">
                어떤 선생님이 우리 아이에게 맞을까요?
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                학년, 과목, 현재 수준, 목표, 성향을 확인한 뒤 조건에 맞는
                선생님 프로필을 안내합니다.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "학생 수준과 목표 확인",
                  "과목별 약점과 수업 방향 분석",
                  "선생님 학교·전공·경력 확인",
                  "학부모님께 선생님 프로필 전달",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3F6DDA] text-sm font-black">
                      ✓
                    </span>
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-[#F2F6FF] p-5">
                <p className="text-3xl font-black text-[#315CD1]">초등~고등</p>
                <p className="mt-2 text-sm font-bold text-slate-600">
                  전 학년 상담 가능
                </p>
              </div>
              <div className="rounded-3xl bg-[#F2F6FF] p-5">
                <p className="text-3xl font-black text-[#315CD1]">1:1</p>
                <p className="mt-2 text-sm font-bold text-slate-600">
                  맞춤 과외 매칭
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-5">
          {subjects.map((subject) => (
            <div
              key={subject}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-center font-black text-slate-800 shadow-sm transition hover:border-[#CAD9FF] hover:bg-[#F2F6FF] hover:text-[#315CD1]"
            >
              {subject}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-black text-[#AFC4FF]">왜 과외친구인가요?</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              단순히 연락처만 전달하지 않습니다.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              과외는 선생님의 학력만으로 결정되지 않습니다. 학생의 성향, 현재
              수준, 수업 목표, 학부모님의 기대치를 모두 고려합니다.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "학생 맞춤 상담",
                desc: "학년, 과목, 성적, 목표, 성향을 바탕으로 필요한 수업 방향을 정합니다.",
              },
              {
                title: "조건 기반 매칭",
                desc: "지역, 시간, 과목, 경력, 희망 과외비를 고려해 선생님을 추천합니다.",
              },
              {
                title: "선생님 프로필 전달",
                desc: "학교, 전공, 가능 과목, 과외 경력, 수업 방식이 포함된 프로필을 안내합니다.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-7"
              >
                <h3 className="text-xl font-black">{card.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center">
          <p className="font-black text-[#315CD1]">이용절차</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            상담부터 첫 수업 결정까지
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#CAD9FF] hover:shadow-lg hover:shadow-[#DDE7FF]"
            >
              <p className="text-sm font-black text-[#315CD1]">{step.number}</p>
              <h3 className="mt-3 text-xl font-black">{step.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-[#EEF4FF] p-6 text-center text-sm font-bold leading-7 text-[#244AA8]">
          1회 시범수업은 무료이며, 정식 수업 진행 여부는 시범수업 이후 결정하실
          수 있습니다.
        </div>
      </section>

      <section id="teachers" className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="font-black text-[#315CD1]">
              선생님 프로필 및 검증
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              학부모님이 확인할 수 있도록 선생님 정보를 전달합니다.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              과외친구는 선생님의 학교, 전공, 가능 과목, 과외 경력, 수업 가능
              조건을 확인한 뒤 학부모님께 프로필 형태로 안내합니다.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "학교 및 전공 확인",
              "재학/졸업 여부 확인",
              "가능 과목 및 가능 학년 확인",
              "과외 경력 및 수업 방식 확인",
              "수업 가능 지역·요일 확인",
              "프로필 전달 후 학부모 확인",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#315CD1] font-black text-white">
                  ✓
                </span>
                <span className="font-black">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="price" className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center">
          <p className="font-black text-[#315CD1]">과외비 안내</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            학년별 월 과외비
          </h2>
          <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
            아래 금액은 학년별 권장 과외비입니다. 실제 과외비는 과목, 지역,
            수업 방식, 선생님 경력에 따라 달라질 수 있습니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {prices.map((item) => (
            <div
              key={item.grade}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-[#CAD9FF] hover:shadow-lg hover:shadow-[#DDE7FF]"
            >
              <h3 className="text-2xl font-black">{item.grade}</h3>
              <p className="mt-4 text-3xl font-black text-[#315CD1]">
                {item.monthly}
              </p>
              <p className="mt-5 leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-[#EEF4FF] p-6 text-center text-sm font-bold leading-7 text-[#244AA8]">
          정식 수업 과외비는 상담 후 학생 상황과 선생님 조건에 맞춰 안내드립니다.
        </div>
      </section>

      <section id="review" className="bg-white px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-black text-[#315CD1]">성적 향상 후기</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              학생에게 맞는 수업은 결과를 바꿉니다.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
              과외친구는 학생의 현재 수준과 약점을 먼저 확인한 뒤, 필요한 수업
              방향에 맞춰 선생님을 추천합니다.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.title}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-[#CAD9FF] hover:shadow-lg hover:shadow-[#DDE7FF]"
              >
                <h3 className="text-xl font-black">{review.title}</h3>
                <p className="mt-4 text-2xl font-black text-[#315CD1]">
                  {review.result}
                </p>
                <p className="mt-5 leading-7 text-slate-600">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-black text-[#315CD1]">자주 묻는 질문</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">F&Q</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-3xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-black">{faq.q}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#315CD1] px-5 py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-2">
          <div>
            <p className="font-black text-[#DDE7FF]">무료 상담 신청</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              학생에게 맞는 선생님을 상담해보세요.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#EEF4FF]">
              이름과 연락처만 남겨주셔도 괜찮습니다. 자세한 내용은 상담 시
              함께 확인해드립니다.
            </p>

            <div className="mt-8 rounded-3xl bg-white/10 p-6">
              <p className="font-black">상담 시 함께 확인하는 내용</p>
              <ul className="mt-4 space-y-3 text-[#EEF4FF]">
                <li>학생 학년 / 희망 과목</li>
                <li>현재 학습 상황 / 목표</li>
                <li>지역 / 화상과외 가능 여부</li>
                <li>희망 요일 / 수업 방식</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-7 text-slate-900">
            <h3 className="text-2xl font-black">상담 요청</h3>
            <p className="mt-2 text-slate-600">
              간단히 남겨주시면 확인 후 연락드리겠습니다.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="parentName"
                  value={form.parentName}
                  onChange={handleChange}
                  required
                  placeholder="학부모 성함"
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#315CD1]"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="연락처"
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#315CD1]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="studentGrade"
                  value={form.studentGrade}
                  onChange={handleChange}
                  required
                  placeholder="학생 학년"
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#315CD1]"
                />
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="희망 과목"
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#315CD1]"
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="추가 상담 내용 (선택)"
                rows={4}
                className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#315CD1]"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-2xl bg-[#315CD1] px-6 py-4 text-center font-black text-white transition hover:bg-[#284FBA] disabled:cursor-not-allowed disabled:bg-[#9EB5F4]"
              >
                {status === "loading" ? "전송 중..." : "상담 요청 보내기"}
              </button>

              {status === "success" && (
                <p className="text-center text-sm font-bold text-[#315CD1]">
                  상담 요청이 접수되었습니다. 확인 후 연락드리겠습니다.
                </p>
              )}

              {status === "error" && (
                <p className="text-center text-sm font-bold text-red-600">
                  전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
                </p>
              )}
            </form>

            <a
              href="http://pf.kakao.com/_fxcPGX/chat"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#CAD9FF] px-6 py-4 text-center font-black text-[#284FBA] transition hover:border-[#AFC4FF] hover:bg-[#F2F6FF]"
            >
              <KakaoIcon />
              카카오톡으로 바로 상담하기
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">선생님 등록 안내</h2>
            <p className="mt-4 leading-8 text-slate-300">
              초등학생·중학생·고등학생 과외가 가능한 선생님을 모집합니다. 학생
              조건에 맞춰 매칭을 진행하며, 매칭 전 선생님 프로필 확인 절차가
              있습니다.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="font-black">등록 시 보내주실 정보</p>
            <p className="mt-4 leading-8 text-slate-300">
              이름 / 학교 / 전공 / 재학 여부 / 가능 과목 / 가능 학년 / 가능 지역
              / 희망 시급 / 과외 경력 / 간단한 자기소개
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm font-medium text-slate-500 md:flex-row">
          <p>© 2026 과외친구. All rights reserved.</p>
          <p>초등·중등·고등 1:1 맞춤 과외 매칭</p>
        </div>
      </footer>
    </main>
  );
}