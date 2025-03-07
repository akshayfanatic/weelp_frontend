import React from 'react'
import { TaxonomyFormNavigation } from '../taxonomies_shared'

export const CreateAttributePageForm = () => {
  return (
    <div>
        <TaxonomyFormNavigation title={"Create Attribute"} description={"Add a new attribute for activities"} url={"/dashboard/admin/taxonomies/attributes/"} />
    </div>
  )
}
