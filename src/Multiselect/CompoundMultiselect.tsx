import { Multiselect as OriginalMultiSelect } from './Multiselect';
import { MultiselectOption } from './MultiselectOption';
import { SelectAllOption } from './SelectAllOption';
import { MultiselectCategory } from './MultiselectCategory';

type CompoundMultiselect = typeof OriginalMultiSelect & {
  Option: typeof MultiselectOption;
  SelectAll: typeof SelectAllOption;
  Category: typeof MultiselectCategory;
};

export const Multiselect = OriginalMultiSelect as CompoundMultiselect;
Multiselect.Option = MultiselectOption;
Multiselect.SelectAll = SelectAllOption;
Multiselect.Category = MultiselectCategory;
