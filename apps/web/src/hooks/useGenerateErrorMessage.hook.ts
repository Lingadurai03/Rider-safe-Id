import { useTranslations } from 'next-intl';

export default function useGenerateErrorMessage() {
    const t = useTranslations();

    return (field: string) => t('validation.isRequired', { name: t(`fields.${field}`) });
}
