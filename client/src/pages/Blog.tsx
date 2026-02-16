import {useState} from "react";
import {motion} from "framer-motion";
import {Search, Calendar, User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {useTranslation, type Language} from "@/lib/i18n";
import {useQuery} from "@tanstack/react-query";
import ParallaxBackground from "@/components/ParallaxBackground";
import {getBlogPosts, portableTextToPlainText, type CmsBlogPost} from "@/lib/cms";

interface BlogPageProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const getCategoryColor = (category: string) => {
  const colors: {[key: string]: string} = {
    cybersecurity: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    datarecovery: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    osint: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    translations: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    training: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };
  return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
};

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

export default function BlogPage({language, onNavigate}: BlogPageProps) {
  const {t} = useTranslation(language);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {data: posts = [], isLoading} = useQuery<CmsBlogPost[]>({
    queryKey: ["/api/cms/blog", language, "list"],
    queryFn: () => getBlogPosts(language),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const categories = Array.from(new Set(posts.map((post) => post.category))).filter(Boolean);

  const filteredPosts = posts.filter((post) => {
    const plainTextContent = portableTextToPlainText(post.content || []);
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plainTextContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="pt-16 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">{t("blog.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <ParallaxBackground>
          <div />
        </ParallaxBackground>
      </div>
      <div className="relative z-10 pt-16">
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30 text-center">
              <motion.h1
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
              >
                {t("blog.title")}
              </motion.h1>
              <motion.p
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.4}}
                className="text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto"
              >
                {t("blog.subtitle")}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.6}}
              >
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder={t("blog.search.placeholder")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm border-white/30 dark:border-gray-600/30 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === "" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("")}
                      size="sm"
                      className={
                        selectedCategory === ""
                          ? "bg-[#264259] dark:bg-[#264259] text-white hover:bg-[#264259] dark:hover:bg-[#264259]"
                          : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-[#264259] hover:text-white dark:hover:bg-[#264259] dark:hover:text-white"
                      }
                    >
                      {t("blog.filter.all")}
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        size="sm"
                        className={
                          selectedCategory === category
                            ? "bg-[#264259] dark:bg-[#264259] text-white hover:bg-[#264259] dark:hover:bg-[#264259]"
                            : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-[#264259] hover:text-white dark:hover:bg-[#264259] dark:hover:text-white"
                        }
                      >
                        {t(`blog.category.${category}`)}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.8}}
              >
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">
                      {t("blog.noresults.title")}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">{t("blog.noresults.subtitle")}</p>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post._id}
                        initial={{opacity: 0, y: 40, scale: 0.95}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        transition={{duration: 0.8, delay: 1 + index * 0.1}}
                      >
                        <Card
                          className="overflow-hidden shadow-lg cursor-pointer bg-white/15 dark:bg-gray-700/30 backdrop-blur-md border-white/40 dark:border-gray-600/40 h-full card-hover flex flex-col rounded-2xl"
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
                          <CardContent className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className={getCategoryColor(post.category)}>
                                {t("blog.category.prefix")} {t(`blog.category.${post.category}`)}
                              </Badge>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-[#bd9775] dark:hover:text-[#bd9775] transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                              {post.excerpt}
                            </p>

                            <div className="mt-auto">
                              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  {post.author}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(post.publishedAt || post.createdAt || "").toLocaleDateString(
                                    "pl-PL",
                                  )}
                                </div>
                              </div>

                              <Button
                                size="sm"
                                className="bg-[#0079f2] dark:bg-blue-600 text-white hover:bg-[#264259] dark:hover:bg-[#264259] font-semibold"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigate(`blog/${post.slug}`);
                                }}
                              >
                                {t("blog.readmore")}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
