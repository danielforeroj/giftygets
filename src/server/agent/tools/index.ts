import { FETCH_PAGE } from '@/server/agent/tools/FETCH_PAGE';
import { EXTRACT_PRODUCT_JSON } from '@/server/agent/tools/EXTRACT_PRODUCT_JSON';
import { SELECT_ALTERNATIVES } from '@/server/agent/tools/SELECT_ALTERNATIVES';
import { DRAFT_EMAIL } from '@/server/agent/tools/DRAFT_EMAIL';

export const toolRegistry = {
  FETCH_PAGE,
  EXTRACT_PRODUCT_JSON,
  SELECT_ALTERNATIVES,
  DRAFT_EMAIL
};
