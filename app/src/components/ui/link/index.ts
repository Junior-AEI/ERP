import { type VariantProps, cva } from 'class-variance-authority'

export { default as Link } from './Link.vue'

export const linkVariants = cva(
  'inline-flex items-center justify-center rounded-md  hover:text-accent transition transition-ease-in',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border border-input bg-background hover:border-accent/40 hover:text-accent',
        active: 'text-accent bg-card/80 shadow-sm hover:shadow-accent/40'
      },
      size: {
        default: 'px-4 py-2 gap-3',
        sm: 'h-9 rounded-md px-3 gap-1',
        lg: 'h-11 rounded-md px-8 gap-3'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type LinkVariants = VariantProps<typeof linkVariants>
