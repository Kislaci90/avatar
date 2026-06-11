import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { Language } from '@mui/icons-material';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  const currentLanguage = i18n.language.toUpperCase();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hu', label: 'Magyar' },
    { code: 'de', label: 'Deutsch' },
  ];

  return (
    <Box>
      <Button
        startIcon={<Language />}
        onClick={handleClick}
        size="small"
        sx={{
          textTransform: 'none',
          fontWeight: 600,
            color: 'white',
        }}
      >
        {currentLanguage}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={i18n.language === language.code}
            sx={{
              fontWeight: i18n.language === language.code ? 600 : 400,
            }}
          >
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;

