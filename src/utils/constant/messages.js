const generateMessage = (entity) => ({

    alreadyExist: `${entity} already exist`,
    notFound: `${entity} not found`,
    createdSuccessfully: `${entity} created successfully`,
    updatedSuccessfully: `${entity} updated successfully`,
    deletedSuccessfully: `${entity} deleted successfully`,
    failToCreate: `fail to create ${entity}`,
    failToUpdate: `fail to update ${entity}`,
    failToDelete: `fail to delete ${entity}`,

})

export const messages = {
    category: generateMessage('category'),
    subcategory: generateMessage('subcategory'),
    brand: generateMessage('brand'),
    product: generateMessage('product'),
    user: { ...generateMessage('user'), verified: 'user verified Successfully', invalidCredentails: 'invalid credentails', LoginSuccessfully: 'login successfully', notAuthorized: 'not authorized to access this api' },
    review: generateMessage('review')
}