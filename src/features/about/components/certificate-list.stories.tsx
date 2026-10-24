import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CertificateList } from "@/features/about/components/certificate-list";

const meta = {
  title: "Features/About/CertificateList",
  component: CertificateList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    certificates: [
      { title: "Responsive Web Design", issuer: "freeCodeCamp" },
      { title: "Belajar Membuat Aplikasi Web dengan React", issuer: "Dicoding" },
      { title: "A certificate without a named issuer" },
    ],
  },
} satisfies Meta<typeof CertificateList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
