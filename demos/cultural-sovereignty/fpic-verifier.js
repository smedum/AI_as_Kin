// demos/cultural-sovereignty/fpic-verifier.js
class FPICVerifier {
    constructor() {
        this.consentRegistry = new Map();
        this.consentHistory = [];
    }

    async grantConsent(communityKeys, knowledgeId, user, conditions = {}) {
        const consentRecord = {
            id: 'consent_' + Math.random().toString(36).substr(2, 9),
            knowledgeId,
            user,
            conditions,
            grantedAt: new Date(),
            isActive: true,
            expiresAt: conditions.expiresAt || this.getDefaultExpiry(),
            restrictions: conditions.restrictions || {}
        };

        // Cryptographically sign the consent
        const signedConsent = await this.signConsent(communityKeys, consentRecord);
        
        this.consentRegistry.set(this.getConsentKey(knowledgeId, user), signedConsent);
        this.consentHistory.push({
            ...signedConsent,
            action: 'granted'
        });

        console.log(`✅ FPIC Consent granted for ${knowledgeId} to ${user.name}`);
        return signedConsent;
    }

    async verifyConsent(communityKeys, knowledgeId, user) {
        const consentKey = this.getConsentKey(knowledgeId, user);
        const consent = this.consentRegistry.get(consentKey);

        if (!consent) {
            console.log(`❌ No FPIC consent found for ${knowledgeId}`);
            return false;
        }

        // Check if consent is still valid
        const now = new Date();
        if (now > new Date(consent.consentData.expiresAt)) {
            console.log(`❌ FPIC consent expired for ${knowledgeId}`);
            this.consentRegistry.delete(consentKey);
            return false;
        }

        if (!consent.consentData.isActive) {
            console.log(`❌ FPIC consent revoked for ${knowledgeId}`);
            return false;
        }

        console.log(`✅ FPIC consent valid for ${knowledgeId}`);
        return true;
    }

    async revokeConsent(communityKeys, knowledgeId, user) {
        const consentKey = this.getConsentKey(knowledgeId, user);
        const consent = this.consentRegistry.get(consentKey);

        if (consent) {
            consent.consentData.isActive = false;
            consent.consentData.revokedAt = new Date();
            
            this.consentHistory.push({
                ...consent,
                action: 'revoked'
            });

            console.log(`🗑️ FPIC consent revoked for ${knowledgeId}`);
        }

        return true;
    }

    async signConsent(communityKeys, consentData) {
        // In real implementation, this would use proper cryptography
        return {
            signature: 'sig_' + Math.random().toString(36).substr(2, 12),
            consentData,
            verifiedBy: communityKeys.publicKey,
            timestamp: new Date()
        };
    }

    getConsentKey(knowledgeId, user) {
        return `${knowledgeId}_${user.id}`;
    }

    getDefaultExpiry() {
        const expiry = new Date();
        expiry.setMonth(expiry.getMonth() + 1); // Default 1 month
        return expiry;
    }

    getConsentHistory() {
        return this.consentHistory;
    }
}
