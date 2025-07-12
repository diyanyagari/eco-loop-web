import { Cpu, FlaskConical, GlassWater, Recycle, Shield } from "lucide-react";
import { JSX } from "react";

export const iconMap: Record<string, JSX.Element> = {
  plastic: <FlaskConical className="w-5 h-5 text-emerald-500" />,
  paper: <Recycle className="w-5 h-5 text-emerald-500" />,
  glass: <GlassWater className="w-5 h-5 text-emerald-500" />,
  metal: <Shield className="w-5 h-5 text-emerald-500" />,
  electronics: <Cpu className="w-5 h-5 text-emerald-500" />,
};
