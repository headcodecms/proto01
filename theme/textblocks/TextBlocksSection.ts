import { TextField, buildSection, SelectField, RichTextField } from '@headcode'
import TextBlocks, { Icon } from './TextBlocks'

export default buildSection({
  name: 'headcodecms/theme-proto:TextBlocksSection',
  label: 'Text Blocks Section',
  theme: 'headcodecms.com/theme-proto',
  component: TextBlocks,
  fields: {},
  blocks: [
    {
      name: 'block',
      label: 'Text block',
      fields: {
        icon: {
          label: 'Icon',
          type: SelectField,
          defaultValue: Object.keys(Icon)[0],
          options: Object.keys(Icon).map((item) => ({
            label: item,
            value: item,
          })),
        },
        caption: {
          label: 'Caption',
          type: TextField,
        },
        title: {
          label: 'Title',
          type: TextField,
        },
        description: {
          label: 'Description',
          type: RichTextField,
        },
      },
    },
  ],
})
