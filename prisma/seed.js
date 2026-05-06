const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('sparsh2026', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@sparsh.com' },
    update: {},
    create: {
      email: 'admin@sparsh.com',
      password: hashedPassword,
      name: 'Sparsh Admin',
    },
  });
  console.log('✅ Admin seeded:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
