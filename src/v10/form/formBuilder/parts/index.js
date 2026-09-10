import { buildContainer } from "./container/index.js";
import { buildHead } from "./head/index.js";
import { buildBody } from "./body/index.js";
import { buildFoot } from "./foot/index.js";
import buildBodyV1 from "./buildBody/v2/index.js";

export { buildContainer, buildHead, buildBody, buildFoot };
export { buildBodyV1 };
export default buildBody;
