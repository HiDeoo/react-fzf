export function Example({ children, header, title }: ExampleProps) {
  return (
    <fieldset>
      <legend>{title}</legend>
      {header}
      <div className="example">{children}</div>
    </fieldset>
  )
}

function Input({ children }: InputOutputProps) {
  return (
    <fieldset>
      <legend>input</legend>
      {children}
    </fieldset>
  )
}

function Output({ children }: InputOutputProps) {
  return (
    <fieldset>
      <legend>output</legend>
      {children}
    </fieldset>
  )
}

Example.Input = Input
Example.Output = Output

interface ExampleProps {
  children: React.ReactNode
  header?: React.ReactNode
  title: string
}

interface InputOutputProps {
  children: React.ReactNode
}
