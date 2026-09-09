import { buildColumnsMap } from "./buildColumnsMap.js";
import { resolveSectionColumns } from "./resolveSectionColumns.js";
import { buildSectionFields } from "./buildSectionFields.js";
import { buildSectionBody } from "./buildSectionBody.js";
import { buildSectionHeader } from "./buildSectionHeader.js";
import { buildSectionCard } from "./buildSectionCard.js";
import { buildSectionNode } from "./buildSectionNode.js";
import { buildSectionsContainer } from "./buildSectionsContainer.js";
import { hasSections } from "./hasSections.js";

const buildSections = ({
    inColumns = [],
    inConfig = {},
    inClasses = {}
} = {}) => {
    if (!hasSections({ inConfig })) {
        return null;
    }

    const columnsMap = buildColumnsMap({ inColumns });

    const sections = inConfig.sections.map(inSection => {
        const sectionColumns = resolveSectionColumns({
            inSection,
            inColumnsMap: columnsMap
        });

        const sectionFields = buildSectionFields({
            inColumns: sectionColumns,
            inClasses,
            inConfig
        });

        const sectionBody = buildSectionBody({
            inChildren: sectionFields,
            inClass: inSection.bodyClass || inClasses?.sectionBody || "d-flex flex-column gap-3"
        });

        const sectionHeader = buildSectionHeader({
            inSection,
            inClasses
        });

        const sectionCard = buildSectionCard({
            inChildren: [sectionHeader, sectionBody].filter(Boolean),
            inSection,
            inClasses
        });

        return buildSectionNode({
            inSection,
            inChildren: [sectionCard]
        });
    });

    return buildSectionsContainer({
        inChildren: sections,
        inClass: inConfig.sectionsRowClass || "row g-4"
    });
};

export { buildSections, hasSections };
export default buildSections;
