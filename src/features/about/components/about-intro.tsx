import { Badge } from "@/components/ui/badge";

type AboutIntroProps = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
};

export function AboutIntro({ name, role, bio, skills }: AboutIntroProps) {
  return (
    <header className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-muted-foreground text-sm">{role}</p>
        <h1 className="mt-2 font-semibold text-4xl tracking-tight">About {name}</h1>
      </div>
      {bio && <p className="text-lg text-muted-foreground leading-relaxed">{bio}</p>}
      {skills.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Skills">
          {skills.map((skill) => (
            <li key={skill}>
              <Badge>{skill}</Badge>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
