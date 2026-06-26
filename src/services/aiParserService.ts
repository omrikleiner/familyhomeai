import { AiIntent, AiSuggestion } from '../types/models';

const taskKeywords = ['מטלה', 'לעשות', 'להוסיף', 'לסדר', 'לכתוב', 'לנקות', 'להוציא', 'להוריד'];
const shoppingKeywords = ['קנה', 'קניות', 'חלב', 'ביצים', 'לחם', 'קמח', 'מוצר'];
const eventKeywords = ['אירוע', 'יום', 'חוג', 'מפגש', 'בילוי', 'נסיעה', 'מסיבה', 'יום הולדת'];

export function parseAiRequest(rawText: string): AiSuggestion {
  const normalized = rawText.trim();
  const lower = normalized.toLowerCase();
  let intent: AiIntent = 'unknown';
  let confidence = 0.3;

  if (!lower) {
    return { intent, title: rawText, confidence, rawText };
  }

  const hasTask = taskKeywords.some((word) => lower.includes(word));
  const hasShopping = shoppingKeywords.some((word) => lower.includes(word));
  const hasEvent = eventKeywords.some((word) => lower.includes(word));

  if (hasEvent && !hasTask && !hasShopping) {
    intent = 'event';
    confidence = 0.8;
  } else if (hasShopping && !hasTask && !hasEvent) {
    intent = 'shopping';
    confidence = 0.8;
  } else if (hasTask && !hasShopping && !hasEvent) {
    intent = 'task';
    confidence = 0.8;
  } else if (hasEvent && hasTask) {
    intent = 'event';
    confidence = 0.6;
  } else if (hasShopping && hasTask) {
    intent = 'shopping';
    confidence = 0.6;
  } else if (hasShopping && hasEvent) {
    intent = 'shopping';
    confidence = 0.5;
  }

  return { intent, title: normalized, confidence, rawText };
}
