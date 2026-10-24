import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContactCta } from "@/features/contact/components/contact-cta";

const meta = {
  title: "Features/Contact/ContactCta",
  component: ContactCta,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    email: "hello@example.com",
    linkedinUrl: "https://www.linkedin.com/in/matfaisall",
  },
} satisfies Meta<typeof ContactCta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
