import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-accent',
        destructive:
          'bg-background border border-destructive text-destructive hover:bg-destructive/90 hover:text-destructive-foreground',
        outline: 'border border-input bg-background hover:border-accent/40 hover:text-accent',
        outline_destructive:
          'border border-input bg-background hover:border-destructive/40 hover:text-destructive',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary hover:text-accent'
      },
      size: {
        default: 'h-10 px-4 py-2 gap-2',
        sm: 'h-9 rounded-md px-3 gap-1',
        lg: 'h-11 rounded-md px-8 gap-3',
        icon: 'text-lg h-10 px-4 py-2 gap-2'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
