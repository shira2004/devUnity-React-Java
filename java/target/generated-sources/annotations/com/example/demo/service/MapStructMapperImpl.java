package com.example.demo.service;

import com.example.demo.dto.ProjectDTO;
import com.example.demo.model.Project;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-12-28T18:06:14+0200",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 19.0.2 (Amazon.com Inc.)"
)
@Component
public class MapStructMapperImpl implements MapStructMapper {

    @Override
    public List<ProjectDTO> projectToDto(List<Project> projects) {
        if ( projects == null ) {
            return null;
        }

        List<ProjectDTO> list = new ArrayList<ProjectDTO>( projects.size() );
        for ( Project project : projects ) {
            try {
                list.add( projectToDto( project ) );
            }
            catch ( IOException e ) {
                throw new RuntimeException( e );
            }
        }

        return list;
    }
}
