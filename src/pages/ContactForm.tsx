import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    let hasError = false;

    if (!name) {
      newErrors.name = "お名前は必須です";
      hasError = true;
    } else if (name.length > 30) {
      newErrors.name = "お名前は30文字以内で入力してください。";
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "メールアドレスは必須です。";
      hasError = true;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "メールアドレスの形式が正しくありません。";
      hasError = true;
    }

    if (!message) {
      newErrors.message = "本文は必須です。";
      hasError = true;
    } else if (message.length > 500) {
      newErrors.message = "本文は500文字以内で入力してください。";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError === true) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        },
      );

      if (response.ok) {
        alert("送信しました");
        reset();
      } else {
        alert("送信に失敗しました");
      }
    } catch {
      alert("通信エラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-2xl mx-auto"
      >
        <h2 className="font-bold text-xl">問い合わせフォーム</h2>
        <div className="flex items-center gap-10">
          <label className="w-32">お名前</label>
          <div className="flex-1 flex flex-col gap-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              type="text"
              id="name"
              name="name"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-10">
          <label className="w-32">メールアドレス</label>
          <div className="flex-1 flex flex-col gap-1">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              type="email"
              id="email"
              name="email"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-10">
          <label className="w-32">本文</label>
          <div className="flex-1 flex flex-col gap-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
              id="message"
              name="message"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-black text-white font-bold rounded-lg hover:bg-gray-800"
          >
            {isSubmitting ? "送信中..." : "送信"}
          </button>
          <button
            onClick={reset}
            disabled={isSubmitting}
            type="button"
            className="px-5 py-2.5 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300"
          >
            クリア
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
