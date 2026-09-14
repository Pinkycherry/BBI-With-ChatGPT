sed -i 's|<ValidateButton slug={idea.slug} />|<ValidateButton ideaPath={`/idea/${idea.slug}`} getUrl={(platform, ctx) => buildValidationUrl(idea, platform, ctx)} />|g' src/routes/idea.\$slug.tsx
