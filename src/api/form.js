const getForm = (res, url) => {
   return res.sendFile(url, {root: "."})
}

module.exports = {getForm}