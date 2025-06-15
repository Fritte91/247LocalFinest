"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  Beaker,
  Sun,
  Brain,
  Lightbulb,
  Scissors,
  Package,
} from "lucide-react"
import { articleCategories } from "../../data"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import GrowingHarvestCuring from '../../growing/harvestcuring';
import GrowingNutrient from '../../growing/nutrient';
import GrowingLightningForYield from '../../growing/lightningforyield';
import GrowingSoilVsHydroponic from '../../growing/soilvshydroponic';

import TerpenesMyrceneVsLimonene from '../../terpenes/myrcenevslimonene';
import TerpenesEntourageEffect from '../../terpenes/entourageeffect';
import TerpenesPreservinTerpenes from '../../terpenes/preservinterpenes';
import TerpenesProfiles from '../../terpenes/terpenesprofiles';

import HealthMicrodosingGuide from '../../health-benefit/Microdosing-guide';
import HealthAnxietyRelief from '../../health-benefit/AnxientyRelief';
import HealthCannabisSleep from '../../health-benefit/CannabisSleep';
import HealthCBDPainManagement from '../../health-benefit/CBDpainmanagement';

import ToolsGrowingEquipment from '../../tools-eqiuipment/growingequipment';
import ToolsStorageSolutions from '../../tools-eqiuipment/storagesolutions';
import ToolsGlassVsMetal from '../../tools-eqiuipment/glassvsmetal';
import ToolsVaporizer2024 from '../../tools-eqiuipment/vaporizer2024';

import { FC } from 'react';

type ArticleComponentType = FC<{}>;

const ARTICLE_COMPONENTS: Record<string, Record<string, ArticleComponentType>> = {
  growing: {
    harvestcuring: GrowingHarvestCuring,
    nutrient: GrowingNutrient,
    lightningforyield: GrowingLightningForYield,
    soilvshydroponic: GrowingSoilVsHydroponic,
  },
  terpenes: {
    myrcenevslimonene: TerpenesMyrceneVsLimonene,
    entourageeffect: TerpenesEntourageEffect,
    preservinterpenes: TerpenesPreservinTerpenes,
    terpenesprofiles: TerpenesProfiles,
  },
  'health-benefit': {
    'Microdosing-guide': HealthMicrodosingGuide,
    AnxientyRelief: HealthAnxietyRelief,
    CannabisSleep: HealthCannabisSleep,
    CBDpainmanagement: HealthCBDPainManagement,
  },
  'tools-eqiuipment': {
    growingequipment: ToolsGrowingEquipment,
    storagesolutions: ToolsStorageSolutions,
    glassvsmetal: ToolsGlassVsMetal,
    vaporizer2024: ToolsVaporizer2024,
  },
};

type ArticleParams = {
  params: {
    category: string;
    slug: string;
  };
};

export default function ArticleDynamicPage({ params }: ArticleParams) {
  const { category, slug } = params;
  const Category = ARTICLE_COMPONENTS[category];
  const ArticleComponent = Category ? Category[slug] : null;

  if (!ArticleComponent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <a href="/members/community/articles" className="bg-sage-800 text-white px-4 py-2 rounded">Back to Articles</a>
      </div>
    );
  }

  return <ArticleComponent />;
} 