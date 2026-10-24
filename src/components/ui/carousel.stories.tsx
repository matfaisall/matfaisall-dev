import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselTrack,
} from "@/components/ui/carousel";

const colours = ["bg-orange-700", "bg-blue-800", "bg-violet-800", "bg-emerald-800"];

const meta = {
  title: "UI/Carousel",
  component: CarouselTrack,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Example slides" },
  render: (args) => (
    <Carousel>
      <div className="mb-4 flex gap-2">
        <CarouselPrevious />
        <CarouselNext />
      </div>
      <CarouselTrack {...args}>
        {colours.map((colour, index) => (
          <CarouselSlide
            key={colour}
            index={index}
            className="basis-4/5 transition-opacity data-[active=false]:opacity-50"
          >
            <div
              className={`grid h-48 place-items-center rounded-xl font-medium text-white ${colour}`}
            >
              Slide {index + 1}
            </div>
          </CarouselSlide>
        ))}
      </CarouselTrack>
    </Carousel>
  ),
} satisfies Meta<typeof CarouselTrack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Swipe, Shift + scroll, use the buttons, or click a dimmed slide. */
export const Default: Story = {};
