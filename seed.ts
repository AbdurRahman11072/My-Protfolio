import 'dotenv/config';
import { prisma } from './src/lib/prisma';


async function main() {
  console.log('Seeding database with portfolio data...');

  // 1. Seed Hero Section
  await prisma.heroSection.deleteMany();
  await prisma.heroSection.create({
    data: {
      greeting: "Hi, I'm",
      name: "Abdur Rahman",
      title: "CS Graduate",
      bio: "Junior Full Stack Engineer with hands-on experience building scalable web applications using React.js, Next.js, Node.js, MongoDB, and PostgreSQL.\n\n📧 abdurrahman1072a@gmail.com\n📱 +880 1405011072\n📍 Barishal, Bangladesh",
      resumeUrl: "",
      profileImage: "",
    }
  });

  // 2. Seed Skills
  await prisma.skillCategory.deleteMany();
  await prisma.skill.deleteMany();

  const skillsData = [
    {
      category: "Languages",
      skills: ["TypeScript", "JavaScript (ES2022+)", "HTML5", "CSS3"]
    },
    {
      category: "Frontend",
      skills: ["React.js", "Next.js 16 (App Router)", "Tailwind CSS", "shadcn/ui", "Redux", "Tanstack Query", "Lenis", "i18Next"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "REST API Design", "JWT", "Bcrypt", "Zod", "Nodemailer", "Stripe", "Better-Auth"]
    },
    {
      category: "Databases",
      skills: ["PostgreSQL (Prisma ORM)", "MongoDB (Mongoose)", "Supabase", "Neon DB"]
    },
    {
      category: "Security",
      skills: ["JWT", "RBAC / ABAC", "Bcrypt", "Zod Validation"]
    },
    {
      category: "Tools & Platforms",
      skills: ["Git & GitHub", "Postman", "VS Code", "Vercel", "pnpm / npm", "Cursor", "V0"]
    }
  ];

  for (const group of skillsData) {
    const category = await prisma.skillCategory.create({
      data: { name: group.category }
    });

    for (const skillName of group.skills) {
      await prisma.skill.create({
        data: {
          name: skillName,
          categoryId: category.id,
          icon: ""
        }
      });
    }
  }

  // 3. Seed Projects
  await prisma.projectDetail.deleteMany();
  await prisma.project.deleteMany();

  const projectsData = [
    {
      title: "Foodie — Food Ordering Platform",
      slug: "foodie",
      description: "A full-stack food ordering platform where users can discover meals, place orders with delivery address, and track real-time order status. Providers manage their menu and incoming orders from a dedicated dashboard.",
      tags: "Next.js 16, TypeScript, Node.js, Express.js, PostgreSQL, Prisma ORM, BetterAuth, REST API, Zod",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      order: 1,
      coreFeatures: "- Browse and filter meals by cuisine, dietary preference, or price range without logging in.\n- Add meals to cart, place orders with delivery address, and monitor real-time order status (Preparing, Ready, Delivered).\n- Provider dashboard to add, edit, or remove menu items and update incoming order statuses.",
    },
    {
      title: "University Bus Management System",
      slug: "university-bus",
      description: "A full-stack bus management system where students can submit route surveys, track bus location, book trips, and see notices. Admins optimize schedules, manage buses and drivers.",
      tags: "Next.js 16, shadcn/ui, TypeScript, Node.js, Express.js, MongoDB, Zod, JWT, Vercel",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      order: 2,
      coreFeatures: "- Users can submit route surveys, track bus location, book a bus for a trip, and view notices.\n- Admin can optimize bus schedules based on survey data, add buses, assign drivers, and send notices.\n- Role-based access control distinguishing student and admin capabilities with JWT-secured endpoints.",
    },
    {
      title: "CourseMaster — Learning Management System",
      slug: "coursemaster",
      description: "A scalable LMS with AI-powered semantic search, auto-graded quiz engine, multi-role authorization, Stripe payment integration, and real-time analytics dashboard.",
      tags: "Next.js, Node.js, Express, Prisma, PostgreSQL, Stripe, Redux, Tailwind CSS, OpenAI",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      order: 3,
      coreFeatures: "- Scalable, modular course architecture with categories, modules, and lessons + AI-powered semantic search for intelligent course discovery.\n- AI-powered auto-graded quiz engine with dynamic MCQ generation and module-based assignment submission.\n- Secure JWT authentication with multi-role authorization (Admin, Instructor, Student) and a RAG-based AI chatbot.\n- Stripe Payment Gateway integration with automated enrollment via webhook handling.",
    }
  ];

  for (const proj of projectsData) {
    const { coreFeatures, ...projectFields } = proj;
    const project = await prisma.project.create({
      data: projectFields
    });

    await prisma.projectDetail.create({
      data: {
        projectId: project.id,
        coreFeatures,
        breakthroughs: "",
        youtubeUrl: ""
      }
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
