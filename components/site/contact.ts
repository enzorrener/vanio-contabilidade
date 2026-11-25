// Canais oficiais da Vanio Contabilidade (post fixado no Instagram, jan/2026):
// WhatsApp só mensagens, telefone pra ligações. Arquivo comum, sem
// "use client": o index (servidor) e as peças interativas usam.
export const WHATSAPP = "554832543588";
export const WHATSAPP_LABEL = "(48) 3254-3588";
export const PHONE_LABEL = "(48) 3354-1534";
export const PHONE_HREF = "tel:+554833541534";
export const wa = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
