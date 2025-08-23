import { useTranslation, Trans } from "react-i18next";
import useTitle from "../customHook/PageTitle";

const PrivacyAndTerm = () => {
  useTitle("Privacy&Term")
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {t("privacy.termsPrivacy.title")}
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        {t("privacy.termsPrivacy.lastUpdated")}
      </p>

      {/* Terms */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("privacy.termsPrivacy.terms.title")}
        </h2>
        <p className="mb-2">{t("privacy.termsPrivacy.terms.intro")}</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><Trans i18nKey="privacy.termsPrivacy.terms.list.1" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.terms.list.2" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.terms.list.3" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.terms.list.4" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.terms.list.5" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.terms.list.6" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.terms.list.7" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.terms.list.8" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.terms.list.9" /></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("privacy.termsPrivacy.privacy.title")}
        </h2>
        <p className="mb-2">{t("privacy.termsPrivacy.privacy.intro")}</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><Trans i18nKey="privacy.termsPrivacy.privacy.list.1" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.privacy.list.2" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.privacy.list.3" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.privacy.list.4" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.privacy.list.5" /></li>
          <li><Trans i18nKey="privacy.termsPrivacy.privacy.list.6" /></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("privacy.termsPrivacy.contact.title")}
        </h2>
        <p>
          {t("privacy.termsPrivacy.contact.desc")}{" "}
          <a
            href={`mailto:mohammedsalah182002@gmail.com`}
            className="text-blue-600 underline"
          >
            {t("privacy.termsPrivacy.contact.email")}
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyAndTerm;
