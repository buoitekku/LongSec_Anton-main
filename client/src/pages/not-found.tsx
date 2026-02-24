import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPageContent, getSection } from "@/lib/cms";
import type { Language } from "@/lib/i18n";

interface NotFoundProps {
  language: Language;
}

export default function NotFound({ language }: NotFoundProps) {
  const { data: pageContent } = useQuery({
    queryKey: ["/api/cms/page-content", "notFound", language],
    queryFn: () => getPageContent("notFound", language),
  });
  const section = getSection(pageContent?.sections, "notFoundStateSection");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">{String(section?.title || "")}</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {String(section?.subtitle || "")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
