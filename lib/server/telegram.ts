type TelegramLead = {
  requestCode: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  products: string[];
  channels: string[];
};

export async function sendOnboardingLeadToTelegram(
  lead: TelegramLead,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!token || !chatId || !threadId) {
    throw new Error("Missing Telegram configuration");
  }

  const escapeHtml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  const text = [
    "🛒 <b>LEAD ONBOARDING MỚI</b>",
    "",
    `<b>Mã yêu cầu:</b> ${escapeHtml(lead.requestCode)}`,
    `<b>Doanh nghiệp / Thương hiệu:</b> ${escapeHtml(lead.companyName)}`,
    `<b>Người liên hệ:</b> ${escapeHtml(lead.contactName)}`,
    `<b>Số điện thoại:</b> ${escapeHtml(lead.phone)}`,
    `<b>Email:</b> ${escapeHtml(lead.email)}`,
    `<b>Sản phẩm:</b> ${escapeHtml(lead.products.join(", ") || "Chưa chọn")}`,
    `<b>Kênh liên hệ:</b> ${escapeHtml(lead.channels.join(", ") || "Chưa cung cấp")}`,
  ].join("\n");

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        message_thread_id: Number(threadId),
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    },
  );

  if (!response.ok) {
    const result = await response.text();
    throw new Error(`Telegram API error: ${result}`);
  }
}
