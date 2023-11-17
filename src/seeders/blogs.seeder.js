const Blog = require("../models/blog.model")


const insertMany = async ()=>{
    Blog.deleteDataTable()
    console.log("Se eliminaron los blogs")
    const blog1 = new Blog(
        {titulo:"los maestros",imagen:"link img 1",contenido:"contenido de un blog completo",createdBy:1,createdAt:new Date()}
    )
    const blog2 = new Blog(
        {titulo:"como se genera mayor confianza",imagen:"link img 2",contenido:"contenido de un blog completo",createdBy:1,createdAt:new Date()}
    )
    const blog3 = new Blog(
        {titulo:"los alumnos y los maestros",imagen:"link img 3",contenido:"contenido de un blog completo",createdBy:1,createdAt:new Date()}
    )
    await blog1.save()
    await blog2.save()
    await blog3.save()
    console.log("Se crearon los blogs")
}
insertMany();