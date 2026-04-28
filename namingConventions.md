# Locator Naming Conventions

## Prefix Guidelines

All locator method names must follow the pattern: `{prefix}{ElementName}`

### Common Prefixes

| Prefix | Element Type | Example |
|--------|--------------|---------|
| `btn` | Button | `btnLogin`, `btnCancel`, `btnSubmit` |
| `inp` | Input field | `inpPassword`, `inpEmail`, `inpUsername` |
| `lbl` | Label | `lblEnterPassword`, `lblErrorMessage` |
| `lnk` | Link/Anchor | `lnkRequests`, `lnkProfile`, `lnkHome` |
| `drp` | Dropdown/Select | `drpFilterByRole`, `drpCountry` |
| `chk` | Checkbox | `chkRememberMe`, `chkTerms` |
| `rdo` | Radio button | `rdoOption1`, `rdoMale` |
| `img` | Image | `imgProfile`, `imgLogo` |
| `tbl` | Table | `tblUser`, `tblData` |
| `row` | Table row | `rowUserByEmail`, `rowFirst` |
| `cell` | Table cell | `cellUserEmail`, `cellUserRoles` |
| `txt` | Textarea | `txtComments`, `txtDescription` |
| `div` | Div container | `divModal`, `divAlert` |
| `spn` | Span | `spnErrorMessage`, `spnCount` |
| `hdr` | Header | `hdrPageTitle`, `hdrSection` |
| `frm` | Form | `frmLogin`, `frmRegistration` |
| `mdl` | Modal/Dialog | `mdlError`, `mdlConfirm` |
| `tab` | Tab | `tabSettings`, `tabProfile` |
| `icn` | Icon | `icnClose`, `icnMenu` |

## Naming Rules

1. **Use camelCase** after the prefix
2. **Be descriptive** - the name should clearly indicate what the element is
3. **Use full words** - avoid abbreviations unless commonly understood
4. **Method names** - Always start with the prefix (e.g., `btnLogin`, not `getBtnLogin`)

## Examples

```typescript
// Buttons
static btnLogin(page: Page): ElementWrapper
static btnCancel(page: Page): ElementWrapper
static btnSubmit(page: Page): ElementWrapper

// Inputs
static inpPassword(page: Page): ElementWrapper
static inpEmail(page: Page): ElementWrapper
static inpUsername(page: Page): ElementWrapper

// Labels
static lblEnterPassword(page: Page): ElementWrapper
static lblErrorMessage(page: Page): ElementWrapper

// Links
static lnkRequests(page: Page): ElementWrapper
static lnkProfile(page: Page): ElementWrapper

// Dropdowns
static drpFilterByRole(page: Page): ElementWrapper
static drpCountry(page: Page): ElementWrapper

// Tables
static tblUser(page: Page): ElementWrapper
static rowUserByEmail(page: Page, email: string): ElementWrapper
static cellUserEmail(page: Page, email: string): ElementWrapper
```

## Usage in Tests

```typescript
// Correct usage
await LoginPage.inpPassword(page).doType("password123");
await LoginPage.btnLogin(page).doClick();
await LoginPage.lblEnterPassword(page).beVisible();

// Incorrect usage (old naming)
await LoginPage.getPasswordInput(page).doType("password123"); // ❌
await LoginPage.getLoginButton(page).doClick(); // ❌
```
