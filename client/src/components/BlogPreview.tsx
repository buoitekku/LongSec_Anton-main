import {useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {useTranslation, type Language} from "@/lib/i18n";
import AnimatedCard from "./AnimatedCard";
import FadeInSection from "./FadeInSection";
import {getBlogPosts, type CmsBlogPost} from "@/lib/cms";

interface BlogPreviewProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const fallbackImageByCategory: Record<string, string> = {
  cybersecurity:
    "https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  translations:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  training:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  osint:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  datarecovery:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
};

export default function BlogPreview({language, onNavigate}: BlogPreviewProps) {
  const {t} = useTranslation(language);

  const {data: posts = [], isLoading} = useQuery<CmsBlogPost[]>({
    queryKey: ["/api/cms/blog", language],
    queryFn: () => getBlogPosts(language),
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <FadeInSection className="mb-12">
        <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/30 dark:border-gray-600/30 shadow-lg">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t("blog.title")}
              </h2>
              <p className="text-lg text-gray-800 dark:text-gray-200">{t("blog.subtitle")}</p>
            </div>
            <Button
              size="sm"
              className="bg-[#264259] hover:bg-[#bd9775] text-white font-semibold px-6 py-2 text-base rounded-xl shadow-md transition-colors duration-200"
              onClick={() => onNavigate("blog")}
            >
              {t("blog.viewall")}
            </Button>
          </div>
        </div>
      </FadeInSection>

      <div className="grid lg:grid-cols-3 gap-8">
        {posts.slice(0, 3).map((post, index) => (
          <AnimatedCard key={post._id} delay={index * 0.15}>
            <div
              className="overflow-hidden shadow-lg cursor-pointer bg-white/15 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl border border-white/40 dark:border-gray-600/40 h-full hover:shadow-xl transition-all duration-200 flex flex-col"
              onClick={() => onNavigate(`blog/${post.slug}`)}
            >
              <img
                src={
                  post.featuredImageUrl ||
                  fallbackImageByCategory[post.category] ||
                  fallbackImageByCategory.cybersecurity
                }
                alt={post.imageAlt || post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-white/30 dark:border-white/20">
                    {post.category}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-xs">
                    {new Date(post.publishedAt || post.createdAt || "").toLocaleDateString("pl-PL")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-[#bd9775] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#264259] rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-400">{post.author}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#264259] hover:bg-[#bd9775] text-white font-semibold transition-colors duration-200 rounded-xl text-xs px-3 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`blog/${post.slug}`);
                    }}
                  >
                    {t("blog.readmore")}
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </>
  );
}
