import { ImageField, RichTextField, buildSection } from '@headcode'
import { TextField, CheckboxField, SelectField } from '@headcode'
import Hero from './Hero'

export default buildSection({
  name: 'headcodecms/theme-free:HeroSection',
  // name: 'userOrOrg/repo:Name'
  // name: 'acme-agency.com:Name'
  // name: 'john@gmail.com:Name'
  // name: '@twittername:Name'
  label: 'Hero Section',
  // theme: defaults to custom
  theme: 'headcodecms.com/free-theme',
  component: Hero,
  fields: {
    img: {
      label: 'Image Field',
      type: ImageField,
    },
    alt: {
      label: 'Image ALT text',
      type: TextField,
    },
    fadeIn: {
      label: 'Fade in or out',
      type: CheckboxField,
    },
    body: {
      label: 'Body (rich text)',
      type: RichTextField,
    },
    size: {
      label: 'Select size',
      type: SelectField,
      defaultValue: 'medium',
      options: [
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
      ],
    },
  },
  blocks: [
    {
      name: 'galleryvideo',
      label: 'Gallery Video',
      fields: {
        url: {
          label: 'Video URL',
          type: TextField,
        },
      },
    },
    {
      name: 'galleryimg',
      label: 'Gallery Image',
      fields: {
        img: {
          label: 'Image',
          type: TextField,
        },
        title: {
          label: 'Image title',
          type: TextField,
        },
      },
      blocks: [
        {
          name: 'links',
          label: 'Image links',
          fields: {
            url: {
              label: 'Image link',
              type: TextField,
            },
          },
        },
      ],
    },
  ],
})
