import React from "react";
import { getSession } from "next-auth/react";
import { useFormik } from "formik";
import { BsCardHeading } from "react-icons/bs";
import { GoRocket } from 'react-icons/go'
import * as Yup from "yup";
import { Textarea, Grid, Input, css, Button, Progress, Text } from "@nextui-org/react";
import { useState } from "react";

const newpost = ({session}) => {
  
  const [loading, setLoading] = useState()
  const [newError, setError] = useState()
 
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      author: `${session?.user.name}`,
    },
    validationSchema: Yup.object({
      title: Yup.string().min(4).max(12).required('This field is required'),
      description: Yup.string().min(40, 'must be at least 40 characters')
      .max(200, 'must less than 200 characters')
      .required('This field is required')
    }),
    onSubmit: async(values) => {
      setLoading(true)
      const makepost = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify(values),
        
      })
        .then((res) => {
          
          if (res.ok) {
            setLoading(false)
            setError('resok')
          }
          if(res.status == '401'){
            setLoading(false)
            setError('error401')
          }
          if(res.status == '500'){
            setLoading(false)
            setError('error500')
          }
          if (res.status == '404'){
            setLoading(false)
            setError('error500')
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div>
      {session ? (
        <div className="mt-20 flex justify-center">
          <div
        className="border-2 w-[500px] h-[500px] bg-slate-200 rounded-xl p-10
        border-purple-600 dark:border-sky-500 flex justify-center">

        <Grid>
        <form onSubmit={formik.handleSubmit}>
          <Input
            onChange={formik.handleChange}
            value={formik.values.title}
            name='title'
            clearable
            underlined
            color="secondary"
            labelPlaceholder="Title"
            contentRight={
              <BsCardHeading  width="16" height="16" fill="#7e22ce"/>
            }
          />
          {formik.errors.title ? <p>{formik.errors.title}</p>  : null}
          <div className="mt-12 flex justify-center">
          <Textarea
          onChange={formik.handleChange}
          value={formik.values.description}
          name='description'
          bordered
          rows={5}
          cols={30}
          color="secondary"
          labelPlaceholder="Your message"
          />
           
          </div>
          {formik.errors.description ? <p className="text-center flex justify-center mr-auto ml-auto
           mt-2  text-red-600">{formik.errors.description}</p>  : null}
          <div className='flex flex-col justify-center mt-6'>
         
          {loading == true
           ? <Progress
                indeterminated
                value={50}
                color="secondary"
                status="secondary"
              />
            :  <Button type="submit" icon={<GoRocket fill="currentColor" />} color="secondary">
                    Create Post
               </Button>}
            <div className="mt-4 flex justify-center">
               {newError == 'error500'
                ?   <Button bordered color="error" auto>
                        Error making a post
                    </Button>
                : newError == 'resok'
                ? <Button bordered color="success" auto>
                    Success
                  </Button>
                : newError == 'error401' ?
                 <Button bordered color="error" auto>
                    You're limited to one post.
                  </Button> : null}
            </div>
          </div>
            </form>
        </Grid> 
      
        </div>
        
        </div>
      ) : (
        <h1>User not sigend in</h1>
      )}
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default newpost;
