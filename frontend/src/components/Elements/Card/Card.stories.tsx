import { Meta, Story } from "@storybook/react";

import { Card } from "./Card";

const meta: Meta = {
  title: "Components/Elements/Button",
  component: Card,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<unknown> = (props) => <Card {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary Card",
};
