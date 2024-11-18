Next.js
Install and configure Next.js.

If you're using Next.js 15, see the Next.js 15 + React 19 guide.

Create project
Run the init command to create a new Next.js project or to setup an existing one:

npx shadcn@latest init
Copy
You can use the -d flag for defaults i.e new-york, zinc and yes for the css variables.

npx shadcn@latest init -d
Copy
Configure components.json
You will be asked a few questions to configure components.json:

Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes
Copy
That's it
You can now start adding components to your project.

npx shadcn@latest add button
Copy
The command above will add the Button component to your project. You can then import it like this:

import { Button } from "@/components/ui/button"
 
export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}