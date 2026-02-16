import {useQuery} from "@tanstack/react-query";
import {useParams} from "wouter";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {ArrowLeft, Calendar, User, Tag} from "lucide-react";
import {useTranslation, type Language} from "@/lib/i18n";
import {getBlogPost, portableTextToPlainText, type CmsBlogPost} from "@/lib/cms";

interface BlogPostPageProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const fallbackImageByCategory: Record<string, string> = {
  cybersecurity:
    "https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  translations:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  training:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  osint:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  datarecovery:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
};

const getCategoryColor = (category: string) => {
  const colors = {
    cybersecurity: "bg-primary/10 text-primary",
    translations: "bg-accent/10 text-accent",
    training: "bg-success/10 text-success",
    osint: "bg-warning/10 text-warning",
    datarecovery: "bg-error/10 text-error",
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-600";
};

export default function BlogPostPage({language, onNavigate}: BlogPostPageProps) {
  const {t} = useTranslation(language);
  const {slug} = useParams();

  const {data: post, isLoading} = useQuery<CmsBlogPost>({
    queryKey: ["/api/cms/blog", slug, language],
    queryFn: () => getBlogPost(slug || "", language),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-16 min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("blog.notFound")}
            </h1>
            <Button onClick={() => onNavigate("blog")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("common.back")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const contentText = portableTextToPlainText(post.content || []);

  return (
    <div className="pt-16 bg-white dark:bg-gray-900">
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button onClick={() => onNavigate("blog")} variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>

          <div className="mb-6">
            <Badge className={getCategoryColor(post.category)}>
              <Tag className="w-3 h-3 mr-1" />
              {t("blog.category.prefix")} {t(`blog.category.${post.category}`)}
            </Badge>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt || post.createdAt || "").toLocaleDateString(
                language === "pl" ? "pl-PL" : language === "en" ? "en-US" : "uk-UA",
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={
                post.featuredImageUrl ||
                fallbackImageByCategory[post.category] ||
                fallbackImageByCategory.cybersecurity
              }
              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {post.excerpt}
                </div>
                <div className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                  {contentText}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
