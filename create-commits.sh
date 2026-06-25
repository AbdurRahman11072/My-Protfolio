#!/bin/bash
# Script to create 50 meaningful commits for the portfolio project

# Configure git user
git config user.email "abdurrahman@example.com"
git config user.name "Abdur Rahman"

# 1. Initial project setup
git add .gitignore
git commit -m "chore: add .gitignore for Next.js project"

# 2. Package configuration
git add package.json pnpm-lock.yaml
git commit -m "chore: initialize project with Next.js and dependencies"

# 3. TypeScript configuration
git add tsconfig.json
git commit -m "chore: configure TypeScript compiler options"

# 4. Next.js configuration
git add next.config.ts
git commit -m "feat: configure Next.js with experimental server actions"

# 5. PostCSS configuration
git add postcss.config.mjs
git commit -m "chore: add PostCSS configuration for Tailwind CSS"

# 6. ESLint configuration
git add eslint.config.mjs
git commit -m "chore: add ESLint configuration"

# 7. shadcn/ui components config
git add components.json
git commit -m "chore: add shadcn/ui components configuration"

# 8. Prisma config
git add prisma.config.ts
git commit -m "feat: add Prisma configuration with Neon adapter"

# 9. Prisma schema - base
git add prisma/schema.prisma
git commit -m "feat: define Prisma schema with all models"

# 10. Prisma migrations
git add prisma/migrations/
git commit -m "feat: add initial database migration"

# 11. Seed script
git add seed.ts
git commit -m "feat: add database seed script for initial data"

# 12. Utility functions
git add src/lib/utils.ts
git commit -m "feat: add utility functions (cn helper)"

# 13. Prisma client singleton
git add src/lib/prisma.ts
git commit -m "feat: create Prisma client singleton for database access"

# 14. Session management
git add src/lib/session.ts
git commit -m "feat: implement JWT session management with jose"

# 15. Global styles
git add src/app/globals.css
git commit -m "style: add global CSS with custom properties and animations"

# 16. Root layout
git add src/app/layout.tsx
git commit -m "feat: create root layout with Inter font and metadata"

# 17. Favicon
git add src/app/favicon.ico
git commit -m "chore: add favicon"

# 18. Public assets
git add public/
git commit -m "chore: add public SVG assets and icons"

# 19. Badge UI component
git add src/components/ui/badge.tsx
git commit -m "feat: add Badge UI component"

# 20. Button UI component
git add src/components/ui/button.tsx
git commit -m "feat: add Button UI component with variants"

# 21. Card UI component
git add src/components/ui/card.tsx
git commit -m "feat: add Card UI component"

# 22. Input UI component
git add src/components/ui/input.tsx
git commit -m "feat: add Input UI component"

# 23. Label UI component
git add src/components/ui/label.tsx
git commit -m "feat: add Label UI component"

# 24. Textarea UI component
git add src/components/ui/textarea.tsx
git commit -m "feat: add Textarea UI component"

# 25. Image uploader component
git add src/components/ui/image-uploader.tsx
git commit -m "feat: add Cloudinary image uploader component"

# 26. Video modal component
git add src/components/ui/video-modal.tsx
git commit -m "feat: add video modal with YouTube embed and autoplay"

# 27. Navbar component
git add src/components/layout/Navbar.tsx
git commit -m "feat: create responsive navbar with smooth scroll navigation"

# 28. Hero section
git add src/components/sections/Hero.tsx
git commit -m "feat: build Hero section with dynamic profile data"

# 29. Career Objective section
git add src/components/sections/CareerObjective.tsx
git commit -m "feat: build dynamic Career Objective section with icon mapping"

# 30. Skills section
git add src/components/sections/Skills.tsx
git commit -m "feat: build Skills section with category-based grid layout"

# 31. Experience section
git add src/components/sections/Experience.tsx
git commit -m "feat: build Experience section with timeline design"

# 32. Projects section
git add src/components/sections/Projects.tsx
git commit -m "feat: build Projects section with alternating full-width layout"

# 33. Contact section
git add src/components/sections/Contact.tsx
git commit -m "feat: build Contact section with form and social links"

# 34. Homepage
git add src/app/page.tsx
git commit -m "feat: compose homepage with all sections and data fetching"

# 35. Upload image action
git add src/app/actions/uploadImage.ts
git commit -m "feat: add server action for Cloudinary image uploads"

# 36. Upload API route
git add src/app/api/upload/route.ts
git commit -m "feat: add API route for file upload handling"

# 37. Auth login API
git add src/app/api/auth/login/route.ts
git commit -m "feat: implement login API with bcrypt password verification"

# 38. Auth logout API
git add src/app/api/auth/logout/route.ts
git commit -m "feat: implement logout API with cookie clearing"

# 39. Login page layout
git add src/app/login/layout.tsx
git commit -m "feat: add login page layout"

# 40. Login page
git add src/app/login/page.tsx
git commit -m "feat: build login page with authentication form"

# 41. Admin layout with sidebar
git add src/app/admin/layout.tsx
git commit -m "feat: create admin layout with sidebar navigation"

# 42. Admin dashboard
git add src/app/admin/page.tsx
git commit -m "feat: build admin dashboard overview page"

# 43. Admin Hero section manager
git add src/app/admin/hero/page.tsx
git commit -m "feat: add admin page for managing Hero section content"

# 44. Admin Career Objective manager
git add src/app/admin/objective/page.tsx
git commit -m "feat: add admin page for managing Career Objective content"

# 45. Admin Skills manager
git add src/app/admin/skills/page.tsx
git commit -m "feat: add admin page for managing Skills with categories"

# 46. Admin Experience manager
git add src/app/admin/experience/page.tsx
git commit -m "feat: add admin page for managing Work Experience entries"

# 47. Admin Projects manager
git add src/app/admin/projects/page.tsx
git commit -m "feat: add admin page for managing Projects with details"

# 48. Admin Messages page
git add src/app/admin/messages/page.tsx
git commit -m "feat: add admin page for viewing contact form messages"

# 49. Dynamic project details page
git add src/app/projects/
git commit -m "feat: create dynamic project details page with video modal"

# 50. Documentation and misc
git add README.md AGENTS.md CLAUDE.md cookies.txt
git commit -m "docs: add README and project documentation"

echo "Done! 50 commits created."
