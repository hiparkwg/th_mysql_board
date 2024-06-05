package com.myjob.board.mybatis;

import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MyFactory {
      public SqlSession session;
      
      public MyFactory(){
        try{
            String path="com/myjob/board/mybatis/config.xml";
            Reader reader = Resources.getResourceAsReader(path);
            SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);
            session = factory.openSession();
        }catch(Exception ex){
            ex.printStackTrace();
        }
      }
      public SqlSession getSession(){
        return this.session;
      }
}
