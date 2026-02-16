import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation, type Language } from "@/lib/i18n";
import type { InsertContact } from "@shared/schema";
import { getSiteSettings } from "@/lib/cms";

interface ContactFormProps {
  language: Language;
  clientType: "B2B" | "B2C";
}

export default function ContactForm({ language, clientType }: ContactFormProps) {
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: siteSettings } = useQuery({
    queryKey: ["/api/cms/site-settings", language, "contact-form"],
    queryFn: () => getSiteSettings(language),
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Sukces",
        description: "Wiadomosc wyslana. Skontaktujemy sie do 24 godzin.",
      });
      setFormData({ name: "", email: "", company: "", phone: "", service: "", message: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: "Blad",
        description: "Nie udalo sie wyslac formularza. Sprobuj ponownie.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...formData, clientType, language });
  };

  const contactInfo = [
    { icon: Phone, label: t("contact.method.phone"), value: siteSettings?.contactPhone || "+48 22 123 4567" },
    { icon: Mail, label: t("contact.method.email"), value: siteSettings?.contactEmail || "kontakt@longsec.pl" },
    { icon: MapPin, label: t("contact.method.address"), value: siteSettings?.contactAddress || "ul. Krakowskie Przedmiescie 5, 00-068 Warszawa" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="parallax-element">
        <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 border border-white/30 dark:border-gray-600/30 shadow-xl mb-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t("contact.title")}</h2>
          <p className="text-lg text-gray-800 dark:text-gray-200">{t("contact.subtitle")}</p>
        </div>

        <div className="space-y-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#264259] rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 bg-white/10 dark:bg-gray-700/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
                  <div className="font-bold text-gray-900 dark:text-white text-lg mb-1">{info.label}</div>
                  <div className="text-gray-800 dark:text-gray-200 font-medium text-base leading-relaxed">{info.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/10 dark:bg-gray-700/20 backdrop-blur-xl rounded-[2rem] p-8 border border-white/30 dark:border-gray-600/30 shadow-xl parallax-element">
        <h3 className="text-gray-900 dark:text-white text-2xl font-bold mb-6">{t("contact.form.title")}</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{t("contact.form.name")}</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl"
                required
              />
            </div>
            <div>
              <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{t("contact.form.email")}</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {clientType === "B2B" && (
              <div>
                <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{t("contact.form.company")}</Label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl"
                />
              </div>
            )}
            <div className={clientType === "B2C" ? "md:col-span-2" : ""}>
              <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{t("contact.form.phone")}</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{t("contact.form.service")}</Label>
            <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
              <SelectTrigger className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl">
                <SelectValue placeholder={t("contact.form.service")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cybersecurity">{t("services.cybersecurity.title")}</SelectItem>
                <SelectItem value="translations">{t("services.translations.title")}</SelectItem>
                <SelectItem value="training">{t("services.training.title")}</SelectItem>
                <SelectItem value="osint">{t("services.osint.title")}</SelectItem>
                <SelectItem value="datarecovery">{t("services.datarecovery.title")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{t("contact.form.message")}</Label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl"
              required
            />
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full bg-[#264259] hover:bg-[#bd9775] text-white py-3 text-lg font-semibold disabled:opacity-50 rounded-xl backdrop-blur-sm transition-colors duration-200">
            <Send className="mr-2 h-5 w-5" />
            {mutation.isPending ? t("contact.form.sending") : t("contact.form.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
}

