import { createContext, useRef, useState } from "react";
import { FormMode } from "../enums";
import { FormContextInterface } from "../types";

export const FormContext = createContext<FormContextInterface | null>(null)

export const FormProvider = ({ children }: { children: React.ReactNode }) => {

  const [isFormVisible, setIsFormVisible] = useState(false)
  const formModeRef = useRef(FormMode.Create)
  const contextValue: FormContextInterface = { isFormVisible, setIsFormVisible, formModeRef };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  )


}