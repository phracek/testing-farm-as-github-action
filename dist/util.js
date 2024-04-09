import { z } from 'zod';
export function composeStatusDescription(infraError, tfSummary) {
    let description = infraError
        ? 'Build failed - Infra problems'
        : 'Build finished';
    return description + tfSummary;
}
export function getSummary(result) {
    const parsedResult = z
        .object({
        summary: z.string().min(1),
    })
        .safeParse(result);
    return parsedResult.success ? ` - ${parsedResult.data.summary}` : '';
}
export function isJsonString(hardware) {
    try {
        JSON.parse(hardware);
    }
    catch (e) {
        return false;
    }
    return true;
}
//# sourceMappingURL=util.js.map