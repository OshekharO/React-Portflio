import {
  SiPython,
  SiOpenjdk,
  SiPandas,
  SiNodedotjs,
  SiBootstrap,
  SiMysql,
  SiGit,
  SiGithub,
} from 'react-icons/si'
import { TbBrandCSharp, TbChartLine, TbApi } from 'react-icons/tb'
import {
  LuSparkles,
  LuSearch,
  LuPenLine,
  LuLinkedin,
  LuMail,
} from 'react-icons/lu'

/**
 * Technology marks: Simple Icons where a brand mark exists, Tabler for the
 * technologies Simple Icons does not carry (C#, Matplotlib, generic API).
 * Keeping the mapping here means data/skills.js stays free of JSX.
 */
export const techIcons = {
  python: SiPython,
  java: SiOpenjdk,
  csharp: TbBrandCSharp,
  pandas: SiPandas,
  matplotlib: TbChartLine,
  nodejs: SiNodedotjs,
  bootstrap: SiBootstrap,
  api: TbApi,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
  sparkles: LuSparkles,
  search: LuSearch,
  writing: LuPenLine,
}

/**
 * Interface glyphs. Lucide only: Simple Icons v5 dropped brand marks that are
 * not in its current slug list, and mixing two stroke systems looks sloppy.
 * GitHub is the deliberate exception — its mark is the recognisable one.
 */
export const uiIcons = {
  github: SiGithub,
  linkedin: LuLinkedin,
  mail: LuMail,
}