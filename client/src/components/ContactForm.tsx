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
import { type Language, useTranslation } from "@/lib/i18n";
import type { InsertContact } from "@shared/schema";
import { getPageContent, getSection, getServices, getSiteSettings, type ClientType } from "@/lib/cms";

interface ContactFormProps {
  language: Language;
  clientType: ClientType;
}

export default function ContactForm({ language, clientType }: ContactFormProps) {
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: siteSettings } = useQuery({
    queryKey: ["/api/cms/site-settings", language, "contact-form"],
    queryFn: () => getSiteSettings(language),
  });
  const { data: services = [] } = useQuery({
    queryKey: ["/api/cms/services", language, clientType, "contact-form"],
    queryFn: () => getServices(language, clientType),
  });
  const { data: pageContent } = useQuery({
    queryKey: ["/api/cms/page-content", "contact", language],
    queryFn: () => getPageContent("contact", language),
  });

  const methodsSection = getSection(pageContent?.sections, "contactMethodsSection");
  const formSection = getSection(pageContent?.sections, "contactFormSection");

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
        title: String(formSection?.successTitle || (language === "pl" ? "Sukces" : "Success")),
        description: String(formSection?.successDescription || t("contact.form.submit")),
      });
      setFormData({ name: "", email: "", company: "", phone: "", service: "", message: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: String(formSection?.errorTitle || (language === "pl" ? "Błąd" : "Error")),
        description: String(formSection?.errorDescription || (language === "pl" ? "Nie udało się wysłać formularza. Spróbuj ponownie." : "Failed to send the form. Please try again.")),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...formData, clientType, language });
  };

  const contactInfo = [
    { icon: Phone, label: String(methodsSection?.phoneLabel || ""), value: siteSettings?.contactPhone || "", description: String(methodsSection?.hoursDescription || "") },
    { icon: Mail, label: String(methodsSection?.emailLabel || ""), value: siteSettings?.contactEmail || "", description: String(methodsSection?.emailDescription || "") },
    { icon: MapPin, label: String(methodsSection?.addressLabel || ""), value: siteSettings?.contactAddress || "", description: String(methodsSection?.addressDescription || "") },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="parallax-element">
        <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 border border-white/30 dark:border-gray-600/30 shadow-xl mb-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{String(formSection?.title || t("contact.form.title"))}</h2>
          <p className="text-lg text-gray-800 dark:text-gray-200">{String(methodsSection?.subtitle || t("contact.methods.subtitle"))}</p>
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
                  <div className="text-sm text-gray-700 dark:text-gray-300">{info.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/10 dark:bg-gray-700/20 backdrop-blur-xl rounded-[2rem] p-8 border border-white/30 dark:border-gray-600/30 shadow-xl parallax-element">
        <h3 className="text-gray-900 dark:text-white text-2xl font-bold mb-6">{String(formSection?.title || t("contact.form.title"))}</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{String(formSection?.nameLabel || t("contact.form.name"))}</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl"
                required
              />
            </div>
            <div>
              <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{String(formSection?.emailLabel || t("contact.form.email"))}</Label>
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
                <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{String(formSection?.companyLabel || t("contact.form.company"))}</Label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl"
                />
              </div>
            )}
            <div className={clientType === "B2G" ? "md:col-span-2" : ""}>
              <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{String(formSection?.phoneLabel || t("contact.form.phone"))}</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{String(formSection?.serviceLabel || t("contact.form.service"))}</Label>
            <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
              <SelectTrigger className="bg-white/40 dark:bg-gray-600/40 backdrop-blur-sm border-white/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 rounded-xl">
                <SelectValue placeholder={String(formSection?.serviceLabel || t("contact.form.service"))} />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service._id} value={service.serviceKey}>{service.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">{String(formSection?.messageLabel || t("contact.form.message"))}</Label>
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
            {mutation.isPending ? String(formSection?.sendingLabel || t("contact.form.sending")) : String(formSection?.submitLabel || t("contact.form.submit"))}
          </Button>
        </form>
      </div>
    </div>
  );
}
