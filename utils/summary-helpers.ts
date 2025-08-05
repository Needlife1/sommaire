export const parseSection = (
  section: string
): { title: string; points: string[] } => {
  const [titleLine, ...rawLines] = section.split('\n');
  const title = titleLine.startsWith('#')
    ? titleLine.slice(1).trim()
    : titleLine.trim();

  const rawContent = rawLines.join(' ').trim();

  const pointRegex = /(?=[•]|\d+\.\s|[\u{1F300}-\u{1F9FF}])/gu;

  const points = rawContent
    .split(pointRegex)
    .map((p) => p.trim())
    .filter(
      (p) => p.length > 0 && !p.startsWith('#') && !p.startsWith('[Choose]')
    );

  return { title, points };
};

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);

  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u2600-\u26FF]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[•\-]\s*/, '').trim();

  const matches = cleanContent.match(/^(\p{Emoji}+)\s+(.*)$/u);
  if (!matches) return null;

  const [, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}