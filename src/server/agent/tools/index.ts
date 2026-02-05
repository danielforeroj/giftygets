import { FETCH_PAGE } from '@/server/agent/tools/FETCH_PAGE';
import { EXTRACT_PRODUCT_JSON } from '@/server/agent/tools/EXTRACT_PRODUCT_JSON';
import { CHECK_VARIANT_AVAILABILITY } from '@/server/agent/tools/CHECK_VARIANT_AVAILABILITY';
import { COMPUTE_CONFIDENCE } from '@/server/agent/tools/COMPUTE_CONFIDENCE';
import { DEDUPE_ALERT } from '@/server/agent/tools/DEDUPE_ALERT';
import { SELECT_ALTERNATIVES } from '@/server/agent/tools/SELECT_ALTERNATIVES';
import { DRAFT_EMAIL } from '@/server/agent/tools/DRAFT_EMAIL';
import { SEND_EMAIL } from '@/server/agent/tools/SEND_EMAIL';
import { UPDATE_INTENT_PROFILE } from '@/server/agent/tools/UPDATE_INTENT_PROFILE';
import { SCHEDULE_NEXT_CHECK } from '@/server/agent/tools/SCHEDULE_NEXT_CHECK';

export const toolRegistry = {
  FETCH_PAGE,
  EXTRACT_PRODUCT_JSON,
  CHECK_VARIANT_AVAILABILITY,
  COMPUTE_CONFIDENCE,
  DEDUPE_ALERT,
  SELECT_ALTERNATIVES,
  DRAFT_EMAIL,
  SEND_EMAIL,
  UPDATE_INTENT_PROFILE,
  SCHEDULE_NEXT_CHECK
};
