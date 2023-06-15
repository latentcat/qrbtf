import React from 'react';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/macro';

const LanguageSwitcher = () => {
    const { i18n } = useLingui();

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        i18n.activate(selectedLanguage);
    };

    return (
        <div>
            <label htmlFor="language-select">
                <Trans>Select Language:</Trans>
            </label>
            <select id="language-select" onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="ch">Chinese</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
