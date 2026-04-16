type N8nPayload = Record<string, unknown>;

const PW_N8N_SPAM_WEBHOOK =
  "https://n8n.precisewolf.net/webhook/54ebafa4-0ecb-408b-aa06-4913543a34f9";
const PW_N8N_SPAM_SECRET =
  "06b4e75591a91fb8fc6a1b96a535122cab39054d854690b1d7c94fdb6f427bfa";
const PW_N8N_FAIL_CLOSED = true;

export async function submitToN8n(payload: N8nPayload) {
  try {
    const response = await fetch(PW_N8N_SPAM_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-pw-n8n-secret": PW_N8N_SPAM_SECRET,
      },
      body: JSON.stringify({
        ...payload,
        secret: PW_N8N_SPAM_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed with status ${response.status}`);
    }
  } catch (error) {
    if (PW_N8N_FAIL_CLOSED) {
      throw error;
    }

    console.error("⚠️ n8n submission failed:", error);
  }
}
