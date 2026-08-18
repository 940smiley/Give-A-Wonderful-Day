# Privacy and Data Handling

## Data Minimization

Collect only the information needed for program delivery, nomination review, consent, event planning, donation stewardship, and auditability. The Prisma schema marks fields that may contain PII with `/// PII:` comments.

## Wonderful Birthday Project — Child Privacy

Children are involved, and their safety is our highest priority.

### What We Collect (Private — Staff Access Only)

- Child's first name or pseudonym (for planning)
- Approximate age range (not exact date of birth)
- City and state (for logistics)
- General medical context category (e.g., "life-limiting", "terminal")
- Guardian name, email, phone (for authorization and contact)
- Family size (aggregate count)
- Accessibility requirements (general, non-identifying)
- Child's interests and preferences (for experience design)

### What We Never Collect

- Exact dates of birth
- Medical records or diagnosis details
- Specific medical conditions
- Home addresses
- Social security numbers or government IDs
- Photos without explicit consent

### What We Publish (Public — With Consent Only)

- Aggregate program statistics (birthdays funded, delivered, children served)
- Total funding metrics
- No individual child's identity, story, or image without verified written consent

### Blockchain Boundary

No sensitive beneficiary information is stored on public blockchain. Any on-chain representation uses only:

- Non-sensitive identifiers
- Aggregate statistics
- Transaction hashes for donation transparency

## Recipient Privacy

Recipient stories, images, outcomes, and identifying details must not be published without explicit consent and staff approval. Placeholder stories must remain clearly labeled as placeholders.

## Donor Privacy

Do not log full email bodies, donor messages, private donor contact data, or payment metadata indiscriminately. Public blockchain data is inherently visible; donor email and traditional payment information must remain protected.

## Retention

Define retention periods before launch. Use soft deletion for operational records where audit history must be preserved, and hard deletion only when policy and law permit it.

Birthday application data should be retained only as long as necessary for program delivery and impact reporting, then purged according to the organization's data retention policy.

## Compliance

Legal nonprofit formation, fundraising registration, tax-deductibility statements, privacy notices, and terms of use must be reviewed separately before launch.

The Wonderful Birthday Project involves children and requires additional consideration:

- Parental/guardian consent for all data collection
- COPPA awareness (if serving children under 13)
- HIPAA awareness (if medical context is shared)
- State-specific child privacy protections
