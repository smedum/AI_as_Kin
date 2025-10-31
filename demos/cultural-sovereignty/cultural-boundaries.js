// demos/cultural-sovereignty/cultural-boundaries.js
class CulturalBoundaries {
    constructor() {
        this.boundaryRules = new Map();
        this.violationLog = [];
    }

    async loadBoundaries() {
        // Baiga cultural boundaries
        this.boundaryRules.set('sacred_calendar', {
            type: 'sacred_knowledge',
            restrictions: ['commercial_use', 'external_research', 'modification'],
            allowed: ['community_education', 'ceremonial_use'],
            requires: ['elder_approval', 'seasonal_context'],
            penalty: 'immediate_revocation'
        });

        this.boundaryRules.set('seed_knowledge', {
            type: 'traditional_innovation',
            restrictions: ['patenting', 'commercialization'],
            allowed: ['community_sharing', 'biodiversity_preservation'],
            requires: ['benefit_sharing', 'attribution'],
            penalty: 'automatic_license_termination'
        });

        this.boundaryRules.set('healing_plants', {
            type: 'medicinal_wisdom',
            restrictions: ['pharmaceutical_extraction', 'unsanctioned_research'],
            allowed: ['community_health', 'knowledge_preservation'],
            requires: ['healer_approval', 'reciprocity_agreement'],
            penalty: 'cultural_sanctions'
        });
    }

    async checkViolation(knowledgeId, user, purpose) {
        const boundary = this.boundaryRules.get(knowledgeId);
        if (!boundary) return false;

        const violation = {
            knowledgeId,
            user,
            purpose,
            timestamp: new Date(),
            violatedRules: []
        };

        // Check restrictions
        if (boundary.restrictions.includes(purpose)) {
            violation.violatedRules.push(`Purpose "${purpose}" is restricted`);
        }

        // Check requirements
        if (boundary.requires && !user.meetsRequirements) {
            violation.violatedRules.push(`User does not meet requirements: ${boundary.requires.join(', ')}`);
        }

        if (violation.violatedRules.length > 0) {
            this.violationLog.push(violation);
            console.log(`🚫 Cultural boundary violation: ${violation.violatedRules.join('; ')}`);
            return true;
        }

        return false;
    }

    getViolations() {
        return this.violationLog;
    }

    addBoundaryRule(knowledgeId, rule) {
        this.boundaryRules.set(knowledgeId, rule);
    }
}
